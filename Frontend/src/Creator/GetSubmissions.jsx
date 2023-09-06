import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import config from '../config/config';
import { useRecoilValue } from 'recoil';
import { token_local } from '../Store/Atom/creator';

// const token = localStorage.getItem("auth-token-creator");


export default function GetSubmissions() {

  const token = useRecoilValue(token_local);
  const headers = {
    Authorization: "Bearer " + token,
};

  const [submissionData, setSubmissionData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = config.base_url + '/api/creator/submissions';
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