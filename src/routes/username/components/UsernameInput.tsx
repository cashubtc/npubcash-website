type UsernameInputProps = {
  username: string;
  setUsername: (s: string) => void;
};

function UsernameInput({ username, setUsername }: UsernameInputProps) {
  return (
    <div className="flex items-center mx-4 p-4 gap-2 rounded  bg-gradient-to-tr from-purple-500 to-pink-500">
      <input
        type="text"
        className="py-1 w-fit text-sm text-center bg-zinc-800/20 rounded"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
        id="username"
      />
      <p className="text-center text-xs">@Cashu-Address.com</p>
    </div>
  );
}

export default UsernameInput;
