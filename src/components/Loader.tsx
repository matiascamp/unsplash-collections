type LoaderProps = {
    message?: string
}

const Loader = ({ message }: LoaderProps) => {
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"/>
            {
                message ? 
                <p className="mt-4">{message}</p>:
                <></>
            }
        </div>
    )
}

export default Loader