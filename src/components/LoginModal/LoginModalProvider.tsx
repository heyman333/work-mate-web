import { ReactNode } from "react";
import { LoginModal } from "./LoginModal";
import { LoginModalProvider, useLoginModal } from "../../contexts/LoginModalContext";

interface LoginModalWrapperProps {
  children: ReactNode;
}

function LoginModalWrapper({ children }: LoginModalWrapperProps) {
  const { isOpen, closeModal } = useLoginModal();

  return (
    <>
      {children}
      <LoginModal isOpen={isOpen} onClose={closeModal} />
    </>
  );
}

export function GlobalLoginModalProvider({ children }: LoginModalWrapperProps) {
  return (
    <LoginModalProvider>
      <LoginModalWrapper>{children}</LoginModalWrapper>
    </LoginModalProvider>
  );
}