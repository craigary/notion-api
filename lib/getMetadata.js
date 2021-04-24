export default function getMetadata(rawMetadata) {
  const metadata = {
    locked: rawMetadata?.format?.block_locked,
    created_time: rawMetadata.created_time,
    last_edited_time: rawMetadata.last_edited_time
  }
  return metadata
}
