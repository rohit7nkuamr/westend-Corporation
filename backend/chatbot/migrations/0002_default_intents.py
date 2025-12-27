from django.db import migrations


def create_default_intents(apps, schema_editor):
    """Create default chatbot intents for cost-effective processing"""
    ChatIntent = apps.get_model('chatbot', 'ChatIntent')
    
    intents = [
        {
            'name': 'greeting',
            'keywords': 'hello,hi,hey,greetings,good morning,good afternoon,good evening',
            'response_template': 'Hello! Welcome to Westend Corporation. I\'m here to help you find information about our products, services, or answer any questions you might have. What can I assist you with today?',
            'requires_ai': False,
            'priority': 100
        },
        {
            'name': 'product_search',
            'keywords': 'product,show,find,looking for,search,item,commodity',
            'response_template': 'I\'ll help you find the right products. Let me search our catalog for you.',
            'requires_ai': False,
            'priority': 90
        },
        {
            'name': 'contact_info',
            'keywords': 'contact,phone,email,address,reach,call,location',
            'response_template': 'Let me provide you with our contact information.',
            'requires_ai': False,
            'priority': 85
        },
        {
            'name': 'pricing',
            'keywords': 'price,cost,quote,how much,rates,pricing,budget',
            'response_template': 'For pricing information, I can help you get a quote. Could you please tell me which products you\'re interested in and the quantity you need?',
            'requires_ai': False,
            'priority': 80
        },
        {
            'name': 'certification',
            'keywords': 'certified,fssai,iso,quality,standards,compliance',
            'response_template': 'Westend Corporation maintains various quality certifications including FSSAI, ISO, and other international standards. All our products meet strict quality control measures.',
            'requires_ai': False,
            'priority': 75
        },
        {
            'name': 'categories',
            'keywords': 'categories,vertical,types,section,department,group',
            'response_template': 'We offer several main product categories. Let me show you what we have available.',
            'requires_ai': False,
            'priority': 70
        },
        {
            'name': 'ticket_create',
            'keywords': 'complaint,issue,problem,support,help,technical',
            'response_template': 'I understand you need support. Let me create a support ticket for you right away.',
            'requires_ai': False,
            'priority': 60
        },
        {
            'name': 'about_company',
            'keywords': 'about,company,who are,history,background,story',
            'response_template': 'Westend Corporation is a leading international food exporter from India, specializing in premium quality food products for global markets.',
            'requires_ai': False,
            'priority': 55
        },
        {
            'name': 'shipping',
            'keywords': 'shipping,delivery,export,logistics,transport,worldwide',
            'response_template': 'We export products worldwide with reliable shipping and logistics. Our products reach USA, Canada, and many other countries with proper documentation and quality assurance.',
            'requires_ai': False,
            'priority': 50
        },
        {
            'name': 'quality',
            'keywords': 'quality,best,premium,top,excellent,standard',
            'response_template': 'Quality is our top priority at Westend Corporation. We maintain strict quality control from sourcing to packaging, ensuring only the best products reach our customers.',
            'requires_ai': False,
            'priority': 45
        },
        {
            'name': 'complex_query',
            'keywords': 'how,why,what is,explain,tell me more,compare,difference,recommend,suggest',
            'response_template': 'That\'s an interesting question. Let me help you with detailed information.',
            'requires_ai': True,
            'priority': 30
        },
        {
            'name': 'goodbye',
            'keywords': 'bye,goodbye,thanks,thank you,see you,exit',
            'response_template': 'Thank you for contacting Westend Corporation! Feel free to reach out anytime if you need more information. Have a great day!',
            'requires_ai': False,
            'priority': 20
        }
    ]
    
    for intent_data in intents:
        ChatIntent.objects.get_or_create(
            name=intent_data['name'],
            defaults=intent_data
        )


def remove_default_intents(apps, schema_editor):
    """Remove default chatbot intents"""
    ChatIntent = apps.get_model('chatbot', 'ChatIntent')
    ChatIntent.objects.filter(name__in=[
        'greeting', 'product_search', 'contact_info', 'pricing', 'certification',
        'categories', 'ticket_create', 'about_company', 'shipping', 'quality',
        'complex_query', 'goodbye'
    ]).delete()


class Migration(migrations.Migration):

    dependencies = [
        ('chatbot', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(create_default_intents, remove_default_intents),
    ]
