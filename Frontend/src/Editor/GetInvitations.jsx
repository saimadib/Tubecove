import { useEffect, useState } from 'react';
import Axios from 'axios';
import config from '../config/config';
import { useRecoilValue } from 'recoil';
import { token_editor } from '../Store/Atom/editor';

// const token = localStorage.getItem("auth-token-editor");
//         const headers = {
//           Authorization: "Bearer " + token,
//         };

  
export default function GetInvitations() {
  const token = useRecoilValue(token_editor);
  const headers = {
    Authorization: "Bearer " + token,
};
  const [InvitationData, setInvitationData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {

      try {
       
        const url = config.base_url + '/api/editor/invitations';
        const loginRes = await Axios.get(url, { headers });
        if (loginRes.status === 200) {
          setInvitationData(loginRes.data);
        } else {
          console.error(`Request failed with status code ${loginRes.status}`);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return InvitationData;
}
