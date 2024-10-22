import { useRouter } from "next/router";
import React, { FC, useRef } from "react";
import useTranslation from "next-translate/useTranslation";
import Landing from "./container/Landing";
import PokeDex from "./container/PokeDex";

const PokemonList: FC = () => {
    const { t } = useTranslation();
    const router = useRouter();

    const pokeDexRef = useRef<HTMLElement | null>(null);

    const handleCheckPokedex = () => {
        if (pokeDexRef.current) {
            pokeDexRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <>
            <Landing onCheckPokedex={handleCheckPokedex} />
            <PokeDex pokeDexRef={pokeDexRef} />
        </>
    );
};

export default PokemonList;
