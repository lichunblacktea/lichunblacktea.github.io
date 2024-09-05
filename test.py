import json
import logging
import uuid
import urllib3
import base64  # Import base64 module

# Configure the logger
logger = logging.getLogger()
logger.setLevel(logging.INFO)

# Constants for the request
hostname = "https://diyow11.uat1.evo-test.com"
casino_key = "diyow11000000001"
ua_token = "test123"
ua_baseurl = f"{hostname}/ua/v1/{casino_key}/{ua_token}"

# Initialize the HTTP client
http = urllib3.PoolManager()

def generate_uuid():
    return str(uuid.uuid4())

def post_to_endpoint(endpoint_url, payload):
    # Make a POST request using urllib3
    encoded_data = json.dumps(payload).encode('utf-8')
    try:
        response = http.request(
            'POST',
            endpoint_url,
            body=encoded_data,
            headers={'Content-Type': 'application/json'}
        )
        return response.status, response.data.decode('utf-8')
    except Exception as e:
        logger.error(f"Error during POST request: {e}")
        return 500, str(e)

def get_from_endpoint(endpoint_url):
    # Make a GET request using urllib3
    try:
        response = http.request('GET', endpoint_url)
        return response.status, response.data.decode('utf-8')
    except Exception as e:
        logger.error(f"Error during GET request: {e}")
        return 500, str(e)


def lambda_handler(event, context):
    logger.info(f"Event received: {event}")
    
    # Extract the body from the event
    body = event.get('body')
    is_base64_encoded = event.get('isBase64Encoded', False)
    
    if is_base64_encoded:
        # Decode Base64 if necessary
        body = base64.b64decode(body).decode('utf-8')
    
    # Now body should be in `key=value` format
    logger.info(f"Decoded body: {body}")
    
    form_data = {}
    if body:
        try:
            # Split the body into key-value pairs
            pairs = body.split('&')
            for pair in pairs:
                key, value = pair.split('=')
                form_data[key] = value

            # Extract values from form_data
            username = form_data.get('username')
            password = form_data.get('password')
            lang = form_data.get('langInput')
            currency = form_data.get('currencyInput')
            sourceIp = event['requestContext']['identity']['sourceIp']
            brand_id = form_data.get('brandInput')
            skin = form_data.get('skinInput')
            game_category = form_data.get('gameCategoryInput')
            game_interface = form_data.get('gameInterfaceInput')
            table_id = form_data.get('tableIDInput')  # Fixed typo here

            # Generate the response based on your conditions
            response = {
                "uuid": generate_uuid(),
                "player": {
                    "id": username,
                    "update": True,
                    "lastName": "",
                    "firstName": "",
                    "country": "",
                    "language": lang,
                    "currency": currency,
                    "session": {
                        "id": "session001",
                        "ip": sourceIp
                    }
                },
                "config": {
                    "brand": {
                        "id": brand_id,
                        "skin": skin
                    },
                    "game": {
                        "category": game_category,
                        "interface": game_interface,
                        **({"table": {"id": table_id}} if table_id else {})
                    }
                }
            }
            
            logger.info(f'Output response: {response}')
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json'
                },
                'body': json.dumps(response)
            }
        
        except Exception as e:
            logger.error(f"Failed to process form data: {e}")
            return {
                'statusCode': 400,
                'body': json.dumps({'error': 'Invalid form data'})
            }
    
    return {
        'statusCode': 400,
        'body': json.dumps({'error': 'No form data found'})
    }
