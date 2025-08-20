import argparse
import subprocess

import uvicorn


def runserver(address: str, dev: bool):
    from src.app import config

    host, port = address.split(":")

    try:
        if dev:
            config.DEBUG = True

            # start tailwind compiler
            try:
                p1 = subprocess.Popen(["npm", "run", "dev"])
            except FileNotFoundError:
                p1 = subprocess.Popen(["npm", "run", "dev"], shell=True)

        # start server
        from src.app.main import app

        uvicorn.run(
            app,
            host=host,
            port=int(port),
        )

    # kill subprocesses when finished
    finally:
        if dev:
            p1.kill()


def main():
    # argparser setup
    parser = argparse.ArgumentParser()
    subparsers = parser.add_subparsers(
        dest="command",
        help="Avaliable commands:",
        required=True,
    )

    # arguments for running the server
    runserver_parser = subparsers.add_parser(
        "runserver",
        help="Starts the server.",
    )
    runserver_parser.add_argument(
        "--address",
        "-a",
        type=str,
        default="0.0.0.0:8000",
        help="A string formatted as 'host:port' containing the IP address and port where the server should run.",
    )
    runserver_parser.add_argument(
        "--dev",
        action="store_true",
        help="If present, the Tailwind CSS compiler will start along with the main server.",
    )

    # parse args and run command
    args = parser.parse_args()
    match args.command:
        case "runserver":
            runserver(args.address, args.dev)


if __name__ == "__main__":
    main()
