import Card from "../components/common/Card";
import PageHeader from "../components/common/PageHeader";
import useAuth from "../hooks/useAuth";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="profile-page">

      <PageHeader
        title="My Profile"
        subtitle="View your account information"
      />

      <Card className="profile-card">

        <div className="profile-avatar">
          {user?.name
            ? user.name.charAt(0).toUpperCase()
            : "U"}
        </div>

        <div className="profile-info">

          <div className="profile-item">

            <label>Full Name</label>

            <p>{user?.name || "Not Available"}</p>

          </div>

          <div className="profile-item">

            <label>Email</label>

            <p>{user?.email || "Not Available"}</p>

          </div>

          <div className="profile-item">

            <label>Role</label>

            <p>{user?.role || "User"}</p>

          </div>

        </div>

      </Card>

    </div>
  );
};

export default Profile;