function AddressSection() {
  return (
    <section className="flex flex-col items-center max-w-2xl mx-8 gap-4 my-8 opacity-0 animate-fadein [animation-delay:800ms]">
      <div>
        <h2 className="text-center font-bold text-2xl bg-gradient-to-tr from-purple-500 to-pink-500 bg-clip-text text-transparent">
          A Lightning-Address powered by eCash
        </h2>
        <p className="text-center ">
          Receive Lightning payments on your Cashu Address. Either sign up and
          claim your username, or use any nostr public key (npub)
        </p>
      </div>
      <div className="bg-gradient-to-tr from-purple-500 to-pink-500 p-4 rounded">
        <p className="md:text-4xl font-bold ">{`<npub... | username> @ <domain>`}</p>
      </div>
    </section>
  );
}

export default AddressSection;
