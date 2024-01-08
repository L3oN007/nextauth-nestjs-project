import { auth } from "@/auth";
import { LogoutButton } from "@/components/auth/logout-button";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { currentUser } from "@/lib/auth-server";
import { useSession } from "next-auth/react";

const HomePage = async () => {
  const user = await currentUser();

  return (
    <div className="bg-slate-800 flex justify-center items-center h-full">
      <Card className="p-7 max-w-[400px]">
        <div>
          <LogoutButton>
            <Button>Logout</Button>
          </LogoutButton>
        </div>
        <div className="mt-3 min-w-[50px] flex justify-center items-center ">
          <p>{JSON.stringify(user)}</p>
        </div>
      </Card>
    </div>
  );
};

export default HomePage;
