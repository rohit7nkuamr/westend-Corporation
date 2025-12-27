#!/usr/bin/env python3

import requests
import json
import sys

# Disable SSL warnings
requests.packages.urllib3.disable_warnings(requests.packages.urllib3.exceptions.InsecureRequestWarning)

def test_chatbot():
    base_url = "http://127.0.0.1:8000/api/chat"
    
    print("🤖 Testing Westend Corporation Chatbot API")
    print("=" * 50)
    
    # Test 1: Create session
    print("\n1. Creating chat session...")
    try:
        response = requests.post(f"{base_url}/sessions/", json={}, headers={'Content-Type': 'application/json'})
        
        if response.status_code == 200:
            session_data = response.json()
            session_id = session_data['session_id']
            print(f"✅ Session created: {session_id}")
        else:
            print(f"❌ Session creation failed: {response.status_code}")
            print(f"Response: {response.text}")
            return False
    except Exception as e:
        print(f"❌ Session creation error: {e}")
        return False
    
    # Test 2: Send greeting
    print("\n2. Testing greeting message...")
    try:
        response = requests.post(f"{base_url}/message/", 
                               json={'session_id': session_id, 'message': 'hello'}, 
                               headers={'Content-Type': 'application/json'})
        
        if response.status_code == 200:
            msg_data = response.json()
            print(f"✅ Bot response: {msg_data['message']['content'][:80]}...")
            print(f"   Source: {msg_data.get('source', 'unknown')}")
        else:
            print(f"❌ Message failed: {response.status_code}")
            print(f"Response: {response.text}")
    except Exception as e:
        print(f"❌ Message error: {e}")
    
    # Test 3: Product search
    print("\n3. Testing product search...")
    try:
        response = requests.post(f"{base_url}/message/", 
                               json={'session_id': session_id, 'message': 'show me products'}, 
                               headers={'Content-Type': 'application/json'})
        
        if response.status_code == 200:
            msg_data = response.json()
            print(f"✅ Product search response: {msg_data['message']['content'][:80]}...")
            print(f"   Source: {msg_data.get('source', 'unknown')}")
        else:
            print(f"❌ Product search failed: {response.status_code}")
    except Exception as e:
        print(f"❌ Product search error: {e}")
    
    # Test 4: Contact info
    print("\n4. Testing contact information...")
    try:
        response = requests.post(f"{base_url}/message/", 
                               json={'session_id': session_id, 'message': 'contact information'}, 
                               headers={'Content-Type': 'application/json'})
        
        if response.status_code == 200:
            msg_data = response.json()
            print(f"✅ Contact info response: {msg_data['message']['content'][:80]}...")
            print(f"   Source: {msg_data.get('source', 'unknown')}")
        else:
            print(f"❌ Contact info failed: {response.status_code}")
    except Exception as e:
        print(f"❌ Contact info error: {e}")
    
    print("\n" + "=" * 50)
    print("🎉 Chatbot API test completed!")
    return True

if __name__ == "__main__":
    test_chatbot()
