import { createAsyncThunk } from "@reduxjs/toolkit";
import MemberService from "../../services/memberService";

import { Member } from "../../types/Member";

export const getAllMembers = createAsyncThunk<Member[]>(
    "member/all",
    async () => {
        const response = await MemberService.fetchAll();
        return response.data;
    }
)