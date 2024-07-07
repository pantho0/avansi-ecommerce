import toast from "react-hot-toast";
import useAxiosSecure from "../../Components/Hooks/useAxiosSecure";
import useUsers from "../../Components/Hooks/useUsers";

const Users = () => {
  const [users, refetch] = useUsers();
  const axiosSecure = useAxiosSecure();

  const handleAdmin = async (id) => {
    const { data } = await axiosSecure.patch(`/updateRoleToAdmin/${id}`);
    if (data.modifiedCount > 0) {
      toast.success("User Role Updated To Admin");
      refetch();
    }
  };
  const handleUser = async (id) => {
    const { data } = await axiosSecure.patch(`/updateRoleToUser/${id}`);
    if (data.modifiedCount > 0) {
      toast.success("User Role Updated To User");
      refetch();
    }
  };

  return (
    <div>
      <div className="text-center bg-black py-3 text-white">
        <div className="space-y-2">
          <p className="text-2xl font-bold">All Users</p>
          <p className="text-sm text-white">Update Users Here</p>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {users.map((user, idx) => (
              <tr key={user._id} className="">
                <th>{idx + 1}</th>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button
                    disabled={user.role === "user"}
                    onClick={() => handleUser(user._id)}
                    className="btn btn-primar bg-green-900 border-none hover:bg-accent hover:text-black text-white"
                  >
                    Make User
                  </button>
                </td>
                <td>
                  <button
                    disabled={user.role === "admin"}
                    onClick={() => handleAdmin(user._id)}
                    className="btn btn-primary bg-green-900 border-none hover:bg-accent hover:text-black text-white"
                  >
                    Make Admin
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
