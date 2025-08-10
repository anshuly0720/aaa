import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  getOutgoingFriendReqs,
  getRecommendedUsers,
  getUserFriends,
  sendFriendRequest,
} from "../lib/api";
import { Link, useNavigate } from "react-router";
import { CheckCircleIcon, MapPinIcon, UserPlusIcon, UsersIcon } from "lucide-react";

import { capitalize } from "../lib/utils";

import FriendCard, { getLanguageFlag } from "../components/FriendCard";

const HomePage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: recommendedUsers = [], isLoading: loadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: getRecommendedUsers,
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto space-y-10">
        <h2 className="text-3xl font-bold mb-2">Meet New Learners</h2>
        <p className="text-base opacity-70 mb-6">
            Craft Your Network, Connect Your Passions
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedUsers.map((user) => {
            return (
              <div
                key={user._id}
                className="card bg-base-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="card-body p-5 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="avatar size-16 rounded-full">
                      <img
                        src={user.profilePic || '/default-avatar.png'}
                        alt={user.fullName}
                        onError={e => { e.target.onerror = null; e.target.src = '/default-avatar.png'; }}
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{user.fullName}</h3>
                      {user.location && (
                        <div className="flex items-center text-xs opacity-70 mt-1">
                          <MapPinIcon className="size-3 mr-1" />
                          {user.location}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="badge badge-outline">
                      {getLanguageFlag(user.language)}
                      Learning: {capitalize(user.language || "")}
                    </span>
                  </div>
                  {user.interests && <p className="text-sm opacity-70">{user.interests}</p>}
                  <button
                    className="btn btn-primary w-full"
                    onClick={() => navigate(`/chat/${user._id}`)}
                  >
                    Message
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
