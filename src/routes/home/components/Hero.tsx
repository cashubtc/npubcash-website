function Hero() {
  return (
    <section className="flex flex-col justify-center gap-4  my-4 mt-8 opacity-0 animate-fadein h-[calc(100vh-7rem)]">
      <div>
        <h2 className="text-center font-bold text-4xl md:text-6xl bg-gradient-to-tr from-purple-500 to-pink-500 bg-clip-text text-transparent">
          Cashu-Address
        </h2>
        <p className="text-center">
          Cashu Mints as better Lightning Address custodians
        </p>
      </div>
      <div className="bg-gradient-to-tr from-purple-500 to-pink-500 p-2 mx-4 rounded">
        <p className="text-lg md:text-2xl text-center font-bold ">{`<npub|user>@cashu-address.com`}</p>
      </div>
    </section>
  );
}

export default Hero;
