import { NFTCard } from "@/app/(root)/(NFT)/nft/collections/_components/NFTCard";
import NFTCardSkeleton from "@/app/(root)/(NFT)/nft/collections/_components/NFTCardSkeleton";
import { Button } from "@/components/ui/button";
import { UnsoldMarketItem } from "@/lib/definitions";
import { CookingPot, Plus } from "lucide-react";
import Link from "next/link";
import { ReadContractErrorType } from "viem";

type UserListedNFTsProps = {
  userListedNFTs: UnsoldMarketItem[];
  isPending: boolean;
  error: ReadContractErrorType | null;
  isConnectedUser: boolean;
};
const UserListedNFTs = ({
  userListedNFTs,
  isPending,
  error,
  isConnectedUser,
}: UserListedNFTsProps) => {
  if (isPending)
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 py-7">
        <NFTCardSkeleton />
        <NFTCardSkeleton />
        <NFTCardSkeleton />
      </div>
    );
  if (error)
    return (
      <div className="bg-muted rounded-lg grid place-items-center gap-2 py-24">
        <p className="text-center text-lg text-destructive font-semibold">
          {error.shortMessage}
        </p>
      </div>
    );
  return (
    <div>
      {userListedNFTs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 py-7">
          {userListedNFTs.map((nft) => (
            <NFTCard key={nft.tokenId} nft={nft} />
          ))}
        </div>
      ) : (
        <div className="bg-muted rounded-lg grid place-items-center gap-2 py-24">
          <p className="text-center text-lg text-muted-foreground font-semibold">
            No Listed NFTs to show!
          </p>
          {isConnectedUser ? (
            <Link href={"/nft/create"}>
              <Button size={"sm"}>
                <Plus /> Create Now
              </Button>
            </Link>
          ) : (
            <CookingPot className="text-muted-foreground" />
          )}
        </div>
      )}
    </div>
  );
};

export default UserListedNFTs;
