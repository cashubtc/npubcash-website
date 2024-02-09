import { ReactNode } from "react";

function ModalWrapper({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="inset-0 bg-black opacity-80 absolute" />
      <div className="absolute inset-0 flex justify-center items-center">
        <dialog
          open
          className="flex flex-col justify-center items-center p-4 rounded bg-zinc-800"
        >
          {children}
        </dialog>
      </div>
    </>
  );
}

export default ModalWrapper;
