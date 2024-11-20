// import linktreeImg from '../assets/linktree.svg';
// import profileDefaultImg from '../assets/profile.png';

// const ProfileEditPage = () => {
//     return (
//         <div className="max-w-2xl mx-auto p-4">
//           <h1 className="text-center text-2xl font-kanit mb-8">Profile edit</h1>
  
//           <div className="flex flex-col items-center">
//             <div className="w-32 h-32 rounded-full bg-white shadow-md mb-8 overflow-hidden">
//                 <img
//                     src={profileDefaultImg}
//                     alt='profile img'
//                     className="w-full h-full"
//                 />
//             </div>

//             <form className="w-full max-w-md space-y-6">
//               <div className="space-y-2">
//                 <label className="block text-sm font-kanit text-black">
//                   username
//                 </label>
//                 <input
//                   type="text"
//                   className="w-full p-3 rounded-lg border border-gray-200 bg-white"
//                 />
//               </div>
  
//               <div className="space-y-2">
//                 <img   
//                     src={linktreeImg}
//                     alt='linktree'
//                     className="w-12 h-5"
//                 />
//                 <input
//                   type="text"
//                   className="w-full p-3 rounded-lg border border-gray-200 bg-white"
//                 />
//               </div>
  
//               <div className="flex justify-end">
//                 <button
//                   type="submit"
//                   className="bg-white font-kanit text-green-800 px-4 py-2 rounded-lg hover:bg-green-100"
//                 >
//                   Save
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//     );
// };
  
// export default ProfileEditPage;




import linktreeImg from '../assets/linktree.svg';
import profileDefaultImg from '../assets/profile.png';
import { useState } from 'react';

const ProfileEditPage = () => {
  const [profileImg, setProfileImg] = useState(profileDefaultImg);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-center text-2xl font-kanit mb-8">Profile edit</h1>

      <div className="flex flex-col items-center">
        <label className="w-32 h-32 rounded-full bg-white shadow-md mb-8 overflow-hidden cursor-pointer">
          <img
            src={profileImg}
            alt="profile img"
            className="w-full h-full"
          />
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
        </label>

        <form className="w-full max-w-md space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-kanit text-black">
              username
            </label>
            <input
              type="text"
              className="w-full p-3 rounded-lg border border-gray-200 bg-white"
            />
          </div>

          <div className="space-y-2">
            <img
              src={linktreeImg}
              alt="linktree"
              className="w-12 h-5"
            />
            <input
              type="text"
              className="w-full p-3 rounded-lg border border-gray-200 bg-white"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-white font-kanit text-green-800 px-4 py-2 rounded-lg hover:bg-green-100"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileEditPage;
