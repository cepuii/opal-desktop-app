import { Button } from "@/components/ui/button";
import { SignedOut, SignInButton, SignOutButton } from "@clerk/clerk-react";

const AuthButton = () => {
  return (
    <SignedOut>
      <div className="flex gap-x-3 h-screen justify-center items-center">
        <SignInButton>
          <Button
            className="px-10 rounded-full text-black hover:bg-gray-200"
            variant={"outline"}
          >
            Sign in
          </Button>
        </SignInButton>
        <SignOutButton>
          <Button className="px-10 rounded-full " variant={"default"}>
            Sign up
          </Button>
        </SignOutButton>
      </div>
    </SignedOut>
  );
};

export default AuthButton;
