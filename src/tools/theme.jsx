import { create } from "zustand";


const useTheme = create((set) => ({
    currentTheme: "light",
    backgroundColor: "white",
    foregroundColor: "black",
    accentColor: "#af695c",

    switchTheme: () => set((state) => ({
        currentTheme: state.currentTheme == "light" ? "dark" : "light",
        backgroundColor: state.backgroundColor == "white" ? "black" : "white",
        foregroundColor: state.foregroundColor == "black" ? "white" : "black"
    })) 
}))

export default useTheme;