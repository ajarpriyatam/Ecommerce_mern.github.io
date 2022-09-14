import React, { Fragment, useState, useEffect } from "react";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import FaceIcon from "@mui/icons-material/Face";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updateProfile, loadUser } from "../../actions/userAction.js";
import { useAlert } from "react-alert";
import { UPDATE_PROFILE_RESET } from "../../constant/userConstant";
import MetaData from "../main.js";
import {useNavigate} from "react-router-dom";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import "./UpdateProfile.css";


const UpdateProfile = ({history}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState();
  const [phone, setPhone] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("/main.jpg");
  const updateProfileSubmit = (e) => {
    e.preventDefault();
    const myForm = {
        "name":name,
        "phone":phone,
        "avatar":avatar
    };
    console.log(myForm);
    dispatch(updateProfile(myForm));
  };
  const updateProfileDataChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  useEffect(() => {
    if (user) {
        setName(user.name);
        setEmail(user.email);
        setPhone(user.phone);
        setAvatarPreview(user.avatar.url);
      }
      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }
      if (isUpdated) {
        alert.success("Profile Updated Successfully");
        dispatch(loadUser());
        navigate("/");
        dispatch({
          type: UPDATE_PROFILE_RESET,
        });
      }
  }, [dispatch, error, alert, history, user, isUpdated,navigate]);
  return (
    <Fragment>
          <MetaData title="Update Profile" />
          <div className="updateProfileContainer">
            <div className="updateProfileBox">
              <h2 className="updateProfileHeading">Update Profile</h2>

              <form
                className="updateProfileForm"
                encType="multipart/form-data"
                onSubmit={updateProfileSubmit}
              >
                <div className="updateProfileName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="updateProfileEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    readOnly
                  />
                </div>
                <div className="updateProfileName">
                  <LocalPhoneIcon />
                  <input
                    type="text"
                    placeholder="Phone"
                    required
                    name="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div id="updateProfileImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={updateProfileDataChange}
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="updateProfileBtn"
                /> 
              </form>
            </div>
          </div>
        </Fragment>
  );
};

export default UpdateProfile;