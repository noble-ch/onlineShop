#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys

def main():
    """Run administrative tasks."""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc

    # Check if the --secure option is provided
    use_ssl = "--secure" in sys.argv
    if use_ssl:
        # Remove the --secure option
        sys.argv.remove("--secure")
        # Set the SSL key and certificate file paths
        os.environ['DJANGO_SSL_KEY'] = '/path/to/your/private.key'
        os.environ['DJANGO_SSL_CERT'] = '/path/to/your/certificate.crt'

    execute_from_command_line(sys.argv)

if __name__ == '__main__':
    main()
