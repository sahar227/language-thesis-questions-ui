import React, { useEffect } from "react";

export default function EndScreen({ emailReports }) {
  useEffect(() => {
    emailReports();
  }, []);
  return <div>Done</div>;
}
