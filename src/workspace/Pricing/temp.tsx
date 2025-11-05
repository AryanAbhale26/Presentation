import { PricingTable, useAuth, useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { firebaseDb } from "../../config/FirebaseConfig";
import { toast } from "sonner";

const Pricing = () => {
  const { has } = useAuth();
  const { user, isSignedIn } = useUser();

  const hasPremiumAccess = has && has({ plan: "pro_user" });

  const giveCreditsIfNewPro = async () => {
    if (!user) return;
    const email = user.primaryEmailAddress?.emailAddress;
    if (!email) return;

    const userRef = doc(firebaseDb, "users", email);
    const snap = await getDoc(userRef);

    const currentCredits = snap.data()?.credits || 0;
    const alreadyGotBonus = snap.data()?.proActivated || false;

    // ✅ User upgraded now for first time → give 300 credits
    if (hasPremiumAccess && !alreadyGotBonus) {
      await setDoc(
        userRef,
        {
          credits: currentCredits + 300,
          proActivated: true, // so they don't get again
        },
        { merge: true }
      );

      toast.success("🎉 Premium activated — 300 credits added!");
    }
  };

  useEffect(() => {
    if (isSignedIn) {
      giveCreditsIfNewPro();
    }
  }, [hasPremiumAccess, isSignedIn]);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 py-10">
      <h1 className="text-white text-3xl md:text-4xl font-bold text-center mb-4">
        Upgrade Your Plan 🚀
      </h1>

      <p className="text-gray-400 text-center mb-10 max-w-xl">
        Unlock premium AI slide creation, advanced exporting, and more credits.
      </p>

      <div className="w-full max-w-4xl bg-zinc-900/60 backdrop-blur-xl rounded-2xl p-6 md:p-10 border border-white/10 shadow-[0_0_40px_rgba(255,255,255,0.08)]">
        <PricingTable />
      </div>

      <p className="text-gray-500 text-xs mt-6 text-center">
        Secured by Clerk • Cancel Anytime
      </p>
    </div>
  );
};

export default Pricing;
