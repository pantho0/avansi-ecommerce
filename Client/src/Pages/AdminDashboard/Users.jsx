import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Components/Hooks/useAxiosPublic";

const Users = () => {
    const axiosPublic = useAxiosPublic()
    const {data:users=[]} = useQuery({
        queryKey: ['users'],
        queryFn: async()=>{
            const {data} = await axiosPublic('/allUsers')
            return data
        }
    })
    return (
        <div>
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
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* row 1 */}
                    {
                        users.map((user, idx)=><tr key={user._id} className="">
                        <th>{idx+1}</th>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>Delete</td>
                        <td>Disale</td>
                        <td>Update Role</td>

                      </tr>)
                    }
                  </tbody>
                </table>
              </div>
        </div>
    );
};

export default Users;