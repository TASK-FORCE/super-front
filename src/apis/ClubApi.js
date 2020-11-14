import axios from 'axios';
import ResponseConverter from '@/apis/converter/ResponseConverter.js';

class ClubApi {
    getClubData(clubSeq) {
        return axios.get('/api/clubs/clubData', { params: clubSeq });
    }

    postClubCreate(clubCreateDto) {
        return axios
            .post('/api/clubs', clubCreateDto)
            .then(ResponseConverter.extractSuperInventionResponseData);
    }

    postClubJoin(seq) {
        return axios.post(`/api/clubs/${seq}/users`);
    }

    postClubBoardCreate({ clubSeq, clubBoardDto }) {
        return axios.post(`/api/clubs/${clubSeq}/boards`, clubBoardDto);
    }
}

const clubApi = new ClubApi();
export default clubApi;