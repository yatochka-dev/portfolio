import pb from "../lib/pocketbase";
import type {FileQueryParams} from "pocketbase";
import type {Record} from "pocketbase";

export default function useAsset(
    record: Record,
    field: string,
    query: FileQueryParams
) {


    const filename = record[field] as string;

    if (!filename) {
        return ''
    }

    return pb.getFileUrl(
        record,
        filename,
        query
    )

}