import axios from 'axios';

const API_PATH =
  process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : '';

export async function getDefaultProfile(profileID, setProfileData) {
  axios
    .get(API_PATH + '/api/defaultProfile/')
    .then((res) => {
      console.log(res);
      setProfileData(res.data);
    })
    .catch((error) => {
      console.log(error);
    });
}
