import {useAuth} from "../../hooks/useAuth.js";
import profileIcon from "../../assets/profileIcon.png";
import {useIcons} from "../../hooks/useIcons.js";
import {useState} from "react";
import styles from "./ProfilePage.module.css";
import {useUpdateProfileMutation, useUpdateProfileBlobMutation} from "../../redux/profile/profileOperations.js";

export const ProfilePage = () => {
    const [updateProfile] = useUpdateProfileMutation();
    const [updateProfileBlob] = useUpdateProfileBlobMutation();
    const {user} = useAuth();
    const icons = useIcons();
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState("");
    const [avatar, setAvatar] = useState(null);
    const [role] = useState(user.roleName);
    const [achievement] = useState(user.achievement);
    const handleInputChange = (evt) => {
        const { name, value } = evt.target;
        switch (name) {
            case "name":
                setName(value);
                return;
            case "email":
                setEmail(value);
                return;
            case "password":
                setPassword(value);
                return;
            default:
                return;

        }
    }
    const handleSubmit = (evt) => {
        evt.preventDefault();
        updateProfile({
            email,
            password,
            googleAuthCode: "string",
            username: name,
            blobId: user.blobId,
        })
    }

    return<>
        <div className={styles.profilePage}>
            <div className={styles.profileHeader}>
                {avatar? (<img
                    src = {avatar} alt = "avatar" className={styles.profileAvatar}/>
                ):(<img
                    src={
                        user.blobId
                            ? `http://127.0.0.1:10000/devstoreaccount1/user-images/${user.blobId}`
                            : profileIcon
                    }
                    alt="profile"
                    className={styles.profileAvatar}
                />
                )}

                <ul className={styles.profileIcons}>
                    {icons.map(({ id, src }) => (
                       /* <li key={id} className={styles.profileIconItem} onClick={handleAvatarChange}>
                            <img src={src} alt="" onClick={(e) => {
                                setAvatar(e.currentTarget.src)
                                const formData = new FormData();
                                formData.append("file", e.currentTarget.src);
                                updateProfileBlob(
                                    {id: user.userId, file: formData}
                                )
                            }} />
                        </li>*/
                        <li
                            key={id}
                            className={styles.profileIconItem}
                        >
                            <img
                                src={src}
                                alt=""
                                onClick={async (e) => {
                                    const src = e.currentTarget.src;
                                    setAvatar(src);

                                    const response = await fetch(src);
                                    const blob = await response.blob();

                                    const file = new File([blob], "avatar.png", {
                                        type: blob.type || "image/png",
                                    });

                                    const formData = new FormData();
                                    formData.append("file", file);

                                    updateProfileBlob({ id: user.userId, file: formData });
                                }}
                            />
                        </li>
                    ))} TODO
                    <li className={styles.profileIconItem}>
                        <label className={styles.addIcon}>
                            <input type = "file" accept="image/*, .png, .jpg, .jpeg, .webp" onChange={(e) => {
                                const file = e.target.files[0];
                                const formData = new FormData();
                                formData.append("file", file);
                                updateProfileBlob(
                                    {id: user.userId, file: formData}
                                )
                                if (file) {
                                    const reader = new FileReader();
                                    reader.onloadend = () => setAvatar(reader.result);
                                    reader.readAsDataURL(file);

                                }
                            }}
                            />
                            +
                        </label>
                    </li>
                </ul>
            </div>

            <form className={styles.profileForm} onSubmit={handleSubmit}>
                <div className={styles.profileField}>
                    <label>User Name</label>
                    <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={handleInputChange}
                    />
                </div>

                <div className={styles.profileField}>
                    <label>Email</label>
                    <input
                        type="text"
                        name="email"
                        value={email}
                        onChange={handleInputChange}
                    />
                </div>

                <div className={styles.profileField}>
                    <label>Password</label>
                    <input
                        type="text"
                        name="password"
                        value={password}
                        onChange={handleInputChange}
                    />
                </div>

                <div className={styles.profileField}>
                    <label>User Role</label>
                    <input type="text" name="userRole" value={role} readOnly />
                </div>

                <div className={styles.profileField}>
                    <label>Achievement</label>
                    <input type="text" name="achievement" value={achievement} readOnly />
                </div>

                <button type="submit" className={styles.profileSubmit}>
                    Edit
                </button>
            </form>
        </div>
    </>
}