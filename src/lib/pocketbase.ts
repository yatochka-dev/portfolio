import PocketBase from 'pocketbase';
import {env} from "../env.mjs";


const pb = new PocketBase(env.NEXT_PUBLIC_API_URL as string,);
pb.autoCancellation(false)

export default pb;
