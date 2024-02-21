import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
function getServerData(url, qKey) {
  return useQuery({
    queryKey: [qKey],
    queryFn: () => {
      return axios.get(url);
    },
  });
}

function deleteNote(getUrl, qKey, qClient) {
  return useMutation({
    mutationFn: (noteId) => {
      return axios.delete(getUrl + "/" + noteId);
    },
    onSuccess: () => {
      console.log("deleted successful");
      qClient.invalidateQueries({
        queryKey: [qKey],
      });
    },
  });
}

function postServerData(url, qKey, qClient) {
  return useMutation({
    queryKey: [qKey],
    mutationFn: (todo) => {
      return axios.post(url, todo);
    },
    onSuccess: () => {
      console.log("Note added successful");
      qClient.invalidateQueries({
        queryKey: [qKey],
      });
    },
  });
}

export { getServerData, deleteNote, postServerData };
