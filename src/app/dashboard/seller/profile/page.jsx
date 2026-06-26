import { requireRole } from "@/lib/requireRole";
import { getUserById } from "@/lib/api/users";
import { Card, Button } from "@heroui/react";
import EditProfileModal from "@/components/dashboard/EditProfileModal";

export default async function SellerProfilePage() {
  const sessionUser = await requireRole("seller");

  const user = await getUserById(sessionUser.id);

  return (
    <div className="min-h-screen bg-[#760031] text-white p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Profile Header */}
        <Card className="bg-white/10 backdrop-blur-xl border border-white/10">
          <Card.Content className="p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              
              <img
                src={
                  user?.image ||
                  "https://ui-avatars.com/api/?name=Seller"
                }
                alt="Profile"
                className="w-28 h-28 rounded-full object-cover border-4 border-[#D51C39]"
              />

              <div className="flex-1 text-center md:text-left">
                <h1
                  className="text-3xl font-bold"
                  style={{
                    fontFamily:
                      "'DM Serif Display', serif",
                  }}
                >
                  {user?.name}
                </h1>

                <p className="text-white/70 mt-1">
                  {user?.email}
                </p>

                <p className="text-white/50 mt-2">
                  Seller Account
                </p>

                <p className="text-white/50 text-sm">
                  Joined{" "}
                  {new Date(
                    user?.createdAt
                  ).toLocaleDateString()}
                </p>
              </div>

              <EditProfileModal user={user} />
            </div>
          </Card.Content>
        </Card>

        {/* Personal Information */}
        <Card className="bg-white/10 backdrop-blur-xl border border-white/10">
          <Card.Header>
            <Card.Title>
              Personal Information
            </Card.Title>
          </Card.Header>

          <Card.Content className="space-y-6">
            <div>
              <p className="text-white/50 text-sm">
                Full Name
              </p>

              <p className="text-lg">
                {user?.name}
              </p>
            </div>

            <div>
              <p className="text-white/50 text-sm">
                Email
              </p>

              <p className="text-lg">
                {user?.email}
              </p>
            </div>

            <div>
              <p className="text-white/50 text-sm">
                Phone Number
              </p>

              <p className="text-lg">
                {user?.phone || "Not Added"}
              </p>
            </div>

            <div>
              <p className="text-white/50 text-sm">
                Address
              </p>

              <p className="text-lg">
                {user?.address || "Not Added"}
              </p>
            </div>
          </Card.Content>
        </Card>
      </div>
    </div>
  );
}