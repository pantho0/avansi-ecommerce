import { Helmet } from "react-helmet-async";
import useAuth from "../../Components/Hooks/useAuth";

const Profile = () => {
    const {user} = useAuth()
  return (
    <>
    <Helmet title="Avansi || User-Profile"/>
    <div className="w-1/2 mx-auto">
      <div className="card bg-base-100 shadow-xl">
        <figure className="px-10 pt-10">
          <img
            src={user?.photoURL ? `${user?.photoURL}`: 
            "https://w7.pngwing.com/pngs/39/283/png-transparent-user-user-people-linear-icon-user-infographic-people-monochrome-thumbnail.png" }
            alt="Shoes"
            className="rounded-full"
          />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{user?.displayName}</h2>
          <p>Role : USER</p>
          <p>Account Created At : {user?.metadata?.creationTime} </p>
        </div>
      </div>
    </div>
    </>
  );
};

export default Profile;
