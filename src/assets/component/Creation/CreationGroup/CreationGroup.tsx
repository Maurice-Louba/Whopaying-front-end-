import axios from "axios";
import { useEffect, useState } from "react";

interface Member {
  id: number;
  username: string;
  
}

interface GroupData {
  name: string;
  members: number[];
  cause: string;
  description: string;
  avatar?: File | null;
}

const CreationGroup = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMembers, setSelectedMembers] = useState<Member[]>([]);
  const [datagroupcreated, setdatagroupcreated] = useState<GroupData>({
    name: "",
    members: [],
    cause: "",
    description: ""
  });
  const [avatar, setAvatar] = useState<File | null>(null);
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const { name, cause, description } = datagroupcreated;

  const categories = [
    'Vacances',
    'Famille',
    'Amis',
    'Projet professionnel',
    'Événement spécial',
    'Sport / activité',
    'Association / ONG',
    'Tâches ménagères',
    'Restaurant',
    'Maison/Appartement',
  ];

  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setdatagroupcreated({
      ...datagroupcreated,
      [e.target.name]: e.target.value
    });
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAvatar(e.target.files[0]);
    }
  };

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:8001/users-all');
        setMembers(res.data);
      } catch (err) {
        console.error("Error fetching members:", err);
        setError("Failed to load members");
      }
    };
    fetchMembers();
  }, []);

  const handlesubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('cause', selectedCategory);
    formData.append('description', description);
    selectedMembers.forEach(member => {
      formData.append('members', member.id.toString());
    });
    if (avatar) {
      formData.append('avatar', avatar);
    }

    try {
      const res = await axios.post('http://127.0.0.1:8001/groups/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log("Group created successfully:", res.data);
      setSuccess(true);
      // Reset form
      setdatagroupcreated({
        name: "",
        members: [],
        cause: "",
        description: ""
      });
      setSelectedMembers([]);
      setSelectedCategory('');
      setAvatar(null);
    } catch (err) {
      console.error("Error creating group:", err);
      setError("Failed to create group. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const filteredMembers = searchTerm
    ? members.filter((member) =>
        member.username.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const toggleSelect = (member: Member) => {
    setSelectedMembers(prev =>
      prev.some(m => m.id === member.id)
        ? prev.filter(m => m.id !== member.id)
        : [...prev, member]
    );
  };

  const isSelected = (id: number) => selectedMembers.some(member => member.id === id);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <form onSubmit={handlesubmit}>
        <div className="text-center mb-6">
          <h1 className="inline-block bg-green-50 px-4 py-2 rounded-2xl text-green-600 font-medium">
            Create a group
          </h1>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
            Group created successfully!
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Group Name */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <label className="block text-sm font-medium text-green-600 mb-2">
                Group name:
              </label>
              <input
                name="name"
                value={name}
                onChange={handleOnchange}
                placeholder="Enter group name"
                type="text"
                required
                className="w-full px-4 py-3 border bg-gray-50 text-gray-700 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            {/* Category Selection */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <label className="block text-sm font-medium text-green-600 mb-2">
                Choose a category:
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 bg-gray-50 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600"
              >
                <option value="">Select a category</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {selectedCategory && (
                <p className="mt-3 text-sm text-gray-700">
                  Selected category: <span className="font-semibold text-green-600">{selectedCategory}</span>
                </p>
              )}
            </div>

            {/* Add Members */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <label className="block text-sm font-medium text-green-600 mb-2">
                Add members:
              </label>
              <input
                type="text"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              />

              {/* Search Results */}
              {searchTerm && (
                <div className="max-h-60 overflow-y-auto border border-gray-200 rounded-lg">
                  {filteredMembers.length > 0 ? (
                    filteredMembers.map((member) => (
                      <div
                        key={member.id}
                        className={`flex items-center px-4 py-3 cursor-pointer ${
                          isSelected(member.id) ? 'bg-blue-50' : 'hover:bg-gray-50'
                        }`}
                        onClick={() => toggleSelect(member)}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected(member.id)}
                          readOnly
                          className="mr-3 h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                        />
                        <span className="text-gray-800">{member.username}</span>
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-sm text-gray-500">
                      No users found
                    </div>
                  )}
                </div>
              )}

              {/* Selected Members */}
              {selectedMembers.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Selected members ({selectedMembers.length}):
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedMembers.map((member) => (
                      <div
                        key={member.id}
                        className="flex items-center bg-green-50 px-3 py-1 rounded-full text-sm text-green-800"
                      >
                        {member.username}
                        <button
                          type="button"
                          onClick={() => toggleSelect(member)}
                          className="ml-2 text-green-600 hover:text-green-800"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Avatar Upload */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <label className="block text-sm font-medium text-green-600 mb-2">
                Group avatar:
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-lg file:border-0
                  file:text-sm file:font-medium
                  file:bg-green-50 file:text-green-700
                  hover:file:bg-green-100"
              />
            </div>
          </div>

          {/* Right Column - Description */}
          <div className="bg-white p-6 rounded-xl shadow-sm h-full flex flex-col">
            <label className="block text-sm font-medium text-green-600 mb-2">
              Description:
            </label>
            <textarea
              value={description}
              name="description"
              onChange={handleOnchange}
              placeholder="Describe your group..."
              className="flex-grow w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              rows={8}
            />

            <div className="mt-6 text-center">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full max-w-xs bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Creating...' : 'Create Group'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreationGroup;