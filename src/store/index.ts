import { defineStore } from "pinia";

export const enum Names {
    ALIVE_PAGES = "ALIVE_PAGES"
}

export const AlivePagesStore = defineStore(Names.ALIVE_PAGES, {
    state: () => {
        return {
            number: 1
        }
    },
    getters: {},
    actions: {}
})