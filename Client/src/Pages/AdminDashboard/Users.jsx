import useAxiosSecure from "../../Components/Hooks/useAxiosSecure";
import useUsers from "../../Components/Hooks/useUsers";
import Swal from "sweetalert2";

const Users = () => {
  const [users, refetch] = useUsers();
  const axiosSecure = useAxiosSecure();

  const handleAdmin = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      background: "#000",
      color: "#fff",
      showCancelButton: true,
      confirmButtonColor: "#22C55E",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Update role to Admin!",
      customClass: {
        popup: "custom-swal-popup",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { data } = await axiosSecure.patch(`/updateRoleToAdmin/${id}`);
        if (data.modifiedCount > 0) {
          refetch();
        }
        Swal.fire({
          title: "Role Updated!",
          background: "#000",
          color: "#fff",
          text: "User Role Updated To Admin.",
          icon: "success",
          customClass: {
            popup: "custom-swal-popup",
          },
        });
      }
    });
  };
  const handleUser = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      background: "#000",
      color: "#fff",
      showCancelButton: true,
      confirmButtonColor: "#22C55E",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Update role to User",
      customClass: {
        popup: "custom-swal-popup",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { data } = await axiosSecure.patch(`/updateRoleToUser/${id}`);
        if (data.modifiedCount > 0) {
          refetch();
        }
        Swal.fire({
          title: "Role Updated!",
          background: "#000",
          color: "#fff",
          text: "Role Updated To User.",
          icon: "success",
          customClass: {
            popup: "custom-swal-popup",
          },
        });
      }
    });
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
