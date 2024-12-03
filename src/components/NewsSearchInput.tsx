import { useState } from "react";
import Button from "./Button";
import CustomInput from "./CustomInput";

interface NewsSearchInputProps {
  searchNews: (q: string) => void;
}

const NewsSearchInput = ({ searchNews }: NewsSearchInputProps) => {
  const [search, setSearch] = useState<string>("");
  return (
    <div className="flex justify-center items-center gap-3 p-2 flex-wrap">
      <CustomInput
        type="text"
        placeholder="Type here"
        className="input input-bordered rounded-md"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Button
        className="btn btn-active btn-neutral"
        onClick={() => {
          if (search.length > 0) {
            setSearch("");
            searchNews(search);
          }
        }}
      >
        Search
      </Button>
    </div>
  );
};

export default NewsSearchInput;
