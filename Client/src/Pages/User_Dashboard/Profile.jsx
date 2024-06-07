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
        <div className="card  mx-6 px-4 rounded-md py-6">
          <figure className="px-10 pt-10">
            <img
              src={
                user?.photoURL
                  ? `${user?.photoURL}`
                  : "https://w7.pngwing.com/pngs/39/283/png-transparent-user-user-people-linear-icon-user-infographic-people-monochrome-thumbnail.png"
              }
              alt="Shoes"
              className="rounded-full w-[150px] h-[150px]"
            />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">{user?.displayName}</h2>
            <p>Role : USER</p>
            <p>Account Created At : {user?.metadata?.creationTime} </p>
          </div>
          <div className="divider"></div>
          <div>
            <h5 className="py-2 text-2xl font-bold text-center">
              Update Youre Profile here!!
            </h5>
            <form onSubmit={handleUpdate}>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">What is your name?</span>
                </div>
                <input
                  type="text"
                  name="name"
                  placeholder="Type here"
                  className="input input-bordered w-full"
                />
              </label>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Upload Image</span>
                </div>
                <input
                  type="file"
                  name="image"
                  className="file-input file-input-bordered file-input-success w-full"
                />
              </label>
              <input
                type="submit"
                value="Update"
                className="btn btn-primary w-full mt-8"
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
