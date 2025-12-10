import io
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, Image as ReportLabImage
from reportlab.lib.units import inch
from reportlab.lib.enums import TA_CENTER, TA_LEFT

from .models import CompanyInfo, Vertical, Product

def generate_catalog_pdf():
    """
    Generates a PDF catalog for Westend Corporation.
    Returns: BytesIO buffer containing the PDF.
    """
    buffer = io.BytesIO()
    doc = SimpleDocTemplate(
        buffer,
        pagesize=A4,
        rightMargin=40, leftMargin=40,
        topMargin=40, bottomMargin=40,
        title="Westend Corporation Catalog"
    )

    elements = []
    styles = getSampleStyleSheet()
    
    # --- Custom Styles ---
    title_style = ParagraphStyle(
        'CustomTitle',
        parent=styles['Heading1'],
        fontSize=24,
        textColor=colors.HexColor('#B8860B'),  # Dark Gold
        alignment=TA_CENTER,
        spaceAfter=20
    )
    
    subtitle_style = ParagraphStyle(
        'CustomSubtitle',
        parent=styles['Heading2'],
        fontSize=14,
        textColor=colors.grey,
        alignment=TA_CENTER,
        spaceAfter=30
    )

    vertical_header_style = ParagraphStyle(
        'VerticalHeader',
        parent=styles['Heading2'],
        fontSize=18,
        textColor=colors.white,
        backColor=colors.HexColor('#B8860B'),
        padding=6,
        alignment=TA_LEFT,
        spaceBefore=20,
        spaceAfter=10,
        borderPadding=5
    )
    
    product_name_style = ParagraphStyle(
        'ProductName',
        parent=styles['Normal'],
        fontSize=12,
        textColor=colors.black,
        fontName='Helvetica-Bold',
        spaceAfter=2
    )
    
    product_desc_style = ParagraphStyle(
        'ProductDesc',
        parent=styles['Normal'],
        fontSize=10,
        textColor=colors.darkgrey,
        spaceAfter=8
    )

    # --- Company Info Section ---
    company = CompanyInfo.objects.first()
    company_name = company.name if company else "Westend Corporation"
    company_tagline = company.tagline if company else "Premium Quality Food Products"
    
    # Logo (if exists) - Resized
    # Note: ReportLab needs a file path. We'll try to get it from the field.
    if company and company.logo_image:
        try:
            # Aspect ratio check could be good, but fixing width is easier
            logo = ReportLabImage(company.logo_image.path, width=2*inch, height=2*inch, kind='proportional')
            elements.append(logo)
            elements.append(Spacer(1, 10))
        except Exception:
             # Fallback if image path is invalid or file missing
             pass

    elements.append(Paragraph(company_name.upper(), title_style))
    elements.append(Paragraph(company_tagline, subtitle_style))
    
    if company:
        # Contact Details
        contact_text = f"""
        <b>Headquarters:</b> {company.headquarters}<br/>
        <b>Contact:</b> {getattr(company, 'phone', '')} | {getattr(company, 'email', '')}<br/>
        <b>Website:</b> www.westendcorporation.in
        """
        elements.append(Paragraph(contact_text, styles['Normal']))
    
    elements.append(Spacer(1, 30))
    elements.append(Paragraph("PRODUCT CATALOG", styles['Heading1']))
    elements.append(Spacer(1, 10))

    # --- Products Loop ---
    verticals = Vertical.objects.filter(is_active=True).order_by('order')
    
    for vertical in verticals:
        # Vertical Header
        elements.append(Paragraph(vertical.title.upper(), vertical_header_style))
        elements.append(Paragraph(vertical.description, styles['Italic']))
        elements.append(Spacer(1, 10))
        
        # Determine Products:
        # We want ALL active products (even if is_public=False, which are "Catalog Only")
        # USE correct related_name 'product_items' for the Product model
        products = vertical.product_items.filter(is_active=True).order_by('order')
        
        if not products.exists():
            elements.append(Paragraph("No products listed.", styles['Italic']))
            continue

        # Prepare Table Data
        data = []
        # Header Row
        data.append(['Product Name', 'Product Description'])
        
        for product in products:
            # Clean Name & Description
            p_name = Paragraph(product.name, product_name_style)
            
            # Use Description field directly as requested
            # Use generic text if description is empty
            desc_text = product.description if product.description else "No description available."
            p_desc = Paragraph(desc_text, product_desc_style)
            
            data.append([p_name, p_desc])

        # Style the Table
        col_widths = [2.5*inch, 4.5*inch]
        t = Table(data, colWidths=col_widths, repeatRows=1)
        t.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#f3f4f6')),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.black),
            ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
            ('VALIGN', (0, 0), (-1, -1), 'TOP'),
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
            ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
            ('GRID', (0, 0), (-1, -1), 0.5, colors.lightgrey),
            ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.whitesmoke]),
            ('PADDING', (0, 0), (-1, -1), 6),
        ]))
        elements.append(t)
        elements.append(Spacer(1, 20))

    # Build PDF
    doc.build(elements)
    
    buffer.seek(0)
    return buffer
