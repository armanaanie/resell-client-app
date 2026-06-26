
import AdminUsersTable from "@/components/dashboard/AdminUsersTable";
import { getUsers } from "@/lib/api/users";
import { getTokenForServer } from "@/lib/useToken";

export default async function AdminUsersPage({
  searchParams,
}) { 
    const token= await getTokenForServer()
     const params = await searchParams;
    
      const search = params?.search || "";
    const role = params?.role || "";
    
      

  

  const users = await getUsers(search, role,token);

  const totalUsers = users.length;
  const buyers = users.filter(
    (u) => u.role === "buyer"
  ).length;

  const sellers = users.filter(
    (u) => u.role === "seller"
  ).length;

  const admins = users.filter(
    (u) => u.role === "admin"
  ).length;

  return (
    <div className="min-h-screen bg-[#760031] p-6 text-white">

      {/* Header */}
      <div className="mb-8">
        <h1
          className="text-4xl font-bold"
          style={{
            fontFamily:
              "'DM Serif Display', serif",
          }}
        >
          Manage Users
        </h1>

        <p className="text-white/60 mt-2">
          Monitor, manage and control
          platform users.
        </p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">

        <div className="bg-white/10 border border-white/10 rounded-3xl p-6 backdrop-blur-xl">
          <p className="text-white/60">
            Total Users
          </p>
          <h2 className="text-4xl font-bold text-[#FEEC41]">
            {totalUsers}
          </h2>
        </div>

        <div className="bg-white/10 border border-white/10 rounded-3xl p-6 backdrop-blur-xl">
          <p className="text-white/60">
            Buyers
          </p>
          <h2 className="text-4xl font-bold text-green-300">
            {buyers}
          </h2>
        </div>

        <div className="bg-white/10 border border-white/10 rounded-3xl p-6 backdrop-blur-xl">
          <p className="text-white/60">
            Sellers
          </p>
          <h2 className="text-4xl font-bold text-blue-300">
            {sellers}
          </h2>
        </div>

        <div className="bg-white/10 border border-white/10 rounded-3xl p-6 backdrop-blur-xl">
          <p className="text-white/60">
            Admins
          </p>
          <h2 className="text-4xl font-bold text-red-300">
            {admins}
          </h2>
        </div>

      </div>

      {/* Filters */}
      <form
        action="/dashboard/admin/users"
        className="
          bg-white/5
          border
          border-white/10
          rounded-3xl
          p-5
          mb-6
          backdrop-blur-xl
          grid
          md:grid-cols-3
          gap-4
        "
      >
        <input
          type="text"
          name="search"
          defaultValue={search}
          placeholder="Search by name or email..."
          className="
            p-3
            rounded-xl
            bg-white/10
            border
            border-white/10
            text-white
            placeholder:text-white/40
          "
        />

        <select
          name="role"
          defaultValue={role}
          className="
            p-3
            rounded-xl
            bg-white/10
            border
            border-white/10
            text-white
          "
        >
          <option value="">
            All Roles
          </option>

          <option value="buyer">
            Buyer
          </option>

          <option value="seller">
            Seller
          </option>

          <option value="admin">
            Admin
          </option>
        </select>

        <button
          className="
            bg-[#D51C39]
            rounded-xl
            font-semibold
          "
        >
          Apply Filters
        </button>
      </form>

      {/* Table */}
      <AdminUsersTable users={users} />

    </div>
  );
}