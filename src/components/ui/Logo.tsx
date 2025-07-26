import Image from "next/image"

const Logo = () => {
    return (<img
        src="/logo.png"
        alt="Divtatva Logo"
        className="h-8 w-8 rounded-full"
        width={32}
        height={32}
    />)
}

export default Logo