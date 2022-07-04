import React from "react"
import { atomWithStorage } from "jotai/utils"
import { ICart } from "../schemas/schema"

export const cartAtomStorage = atomWithStorage<ICart[] | undefined>(
    "cart",
    undefined
)
