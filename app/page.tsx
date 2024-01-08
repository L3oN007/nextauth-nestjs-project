import { auth } from "@/auth";
import { LogoutButton } from "@/components/auth/logout-button";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { currentUser } from "@/lib/auth-server";

const LoginPage = () => {
  const user = currentUser();
  console.log("SERVER", user);
  return (
    <div className="bg-slate-800 flex justify-center items-center h-full">
      <Card className="p-7">
        <div>
          <LogoutButton>
            <Button>Logout</Button>
          </LogoutButton>
        </div>
        {/* <div className="mt-3">{JSON.stringify(user)}</div> */}
      </Card>
    </div>
  );
};

export default LoginPage;
