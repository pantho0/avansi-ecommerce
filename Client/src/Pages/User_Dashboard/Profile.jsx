import { Helmet } from "react-helmet-async";
import useAuth from "../../Components/Hooks/useAuth";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { uploadImage } from "../../Components/api/api";
import { toast } from "react-hot-toast";
import { reload } from "firebase/auth";

const Profile = () => {
  const { user } = useAuth();
  const { updateUserProfile } = useContext(AuthContext);
  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const image = form.image.files[0];
    console.log(name, image);
    const url = await uploadImage(image);
    console.log(url);
    await updateUserProfile(name, url)
      .then(() => {
        toast.success("User Profile Updated");
        window.location.reload();
      })
      .catch((error) => {
        toast.error(`Error Occured : ${error?.message}`);
      });
  };
  return (
    <>
      <Helmet title="Avansi || User-Profile" />
      <div className="flex min-h-screen items-center justify-center md:w-1/2 mx-auto">
        <div className="card bg-blue-100 mx-6 px-4 rounded-md">
          <figure className="px-10 pt-10">
            <img
              src={
                user?.photoURL
                  ? `${user?.photoURL}`
                  : "https://w7.pngwing.com/pngs/39/283/png-transparent-user-user-people-linear-icon-user-infographic-people-monochrome-thumbnail.png"
              }
              alt="Shoes"
              className="rounded-full w-[50%] h-[50%]"
            />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">{user?.displayName}</h2>
            <p>Role : USER</p>
            <p>Account Created At : {user?.metadata?.creationTime} </p>
          </div>
          <form onSubmit={handleUpdate}>
            <input type="text" name="name" />
            <input type="file" name="image" id="" />
            <input type="submit" value="submit now" />
          </form>
        </div>
      </div>
    </>
  );
};

export default Profile;
