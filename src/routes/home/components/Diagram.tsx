import diagram from "../../../assets/diagram.png";

function Diagram() {
  return (
    <section className="flex flex-col items-center gap-8 mt-16 mb-4 max-w-4xl p-4 justify-center animate-fadein [animation-delay:800ms]">
      <div>
        <h2 className="text-center font-bold text-2xl bg-gradient-to-tr from-purple-500 to-pink-500 bg-clip-text text-transparent">
          How does it work?
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <div className=" max-w-4xl p-4 rounded bg-zinc-800 md:col-span-2 flex items-center">
          <img src={diagram} />
        </div>
        <div className="flex flex-col p-4 bg-zinc-800 rounded gap-4">
          <div>
            <p>
              <span className="text-2xl font-bold bg-gradient-to-tr from-purple-500 to-pink-500 bg-clip-text text-transparent">
                1.
              </span>{" "}
              Lightning Payment
            </p>
            <p className="text-sm text-zinc-400">
              Alices sends a Lightnin Payment to Bob's Cashu-Address
            </p>
          </div>
          <div>
            <p>
              <span className="text-2xl font-bold bg-gradient-to-tr from-purple-500 to-pink-500 bg-clip-text text-transparent">
                2.
              </span>{" "}
              Minting
            </p>
            <p className="text-sm text-zinc-400">
              Cashu-Address forwards the payment to the Mint. The Mint creates
              eCash locked to Bob's public key and returns it to Cashu-Address.
            </p>
          </div>
          <div>
            <p>
              <span className="text-2xl font-bold bg-gradient-to-tr from-purple-500 to-pink-500 bg-clip-text text-transparent">
                3.
              </span>{" "}
              Claiming
            </p>
            <p className="text-sm text-zinc-400">
              Once Bob is back online, he checks for waiting payments and claims
              them with his Cashu Wallet
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Diagram;
