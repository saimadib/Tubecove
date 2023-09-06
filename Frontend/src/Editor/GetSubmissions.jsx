import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import config from '../config/config';
import { useRecoilValue } from 'recoil';
import { token_editor } from '../Store/Atom/editor';


export default function GetSubmissions() {

  const token = useRecoilValue(token_editor);
  const headers = {
    Authorization: "Bearer " + token,
};

  const [submissionData, setSubmissionData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = config.base_url + '/api/editor/submissions';
        const loginRes = await Axios.get(url,{headers});
        setSubmissionData(loginRes.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return submissionData;
}