import jsPDF from "jspdf";
import html2canvas from "html2canvas";

/**
 * Convert modern CSS color functions to hex colors for html2canvas compatibility
 * Handles oklch(), color(), lab(), lch(), hwb(), and other unsupported functions
 * @param clonedDoc The cloned document from html2canvas
 */
function convertUnsupportedColors(clonedDoc: Document): void {
  // First, scan all stylesheets and replace unsupported color functions
  const stylesheets = Array.from(clonedDoc.styleSheets);
  stylesheets.forEach(stylesheet => {
    try {
      if (stylesheet.cssRules) {
        Array.from(stylesheet.cssRules).forEach(rule => {
          if (rule instanceof CSSStyleRule) {
            // Replace unsupported color functions in CSS rules
            replaceUnsupportedColorsInRule(rule);
          }
        });
      }
    } catch (e) {
      // Cross-origin stylesheets may throw errors, ignore them
      console.warn('Could not access stylesheet rules:', e);
    }
  });

  // Then scan all elements with inline styles
  const elements = clonedDoc.querySelectorAll('*');
  elements.forEach(element => {
    if (element instanceof HTMLElement && element.style) {
      replaceUnsupportedColorsInStyle(element.style);
    }
  });

  // Create a comprehensive style override for known color classes
  const style = clonedDoc.createElement('style');
  style.textContent = `
    /* Force hex colors for html2canvas compatibility */
    :root {
      --color-brand-500: #465fff !important;
      --color-brand-600: #3641f5 !important;
      --color-blue-500: #3b82f6 !important;
      --color-blue-100: #dbeafe !important;
      --color-green-500: #10b981 !important;
      --color-green-100: #dcfce7 !important;
      --color-orange-500: #f97316 !important;
      --color-orange-100: #fed7aa !important;
      --color-purple-500: #8b5cf6 !important;
      --color-purple-100: #e9d5ff !important;
      --color-gray-500: #6b7280 !important;
      --color-gray-700: #374151 !important;
      --color-gray-800: #1f2937 !important;
      --color-gray-300: #d1d5db !important;
      --color-gray-400: #9ca3af !important;
    }
    
    /* Override specific Tailwind classes used in the Facebook report */
    .text-blue-500 { color: #3b82f6 !important; }
    .text-green-500 { color: #10b981 !important; }
    .text-orange-500 { color: #f97316 !important; }
    .text-purple-500 { color: #8b5cf6 !important; }
    .text-gray-500 { color: #6b7280 !important; }
    .text-gray-700 { color: #374151 !important; }
    .text-gray-800 { color: #1f2937 !important; }
    .text-gray-300 { color: #d1d5db !important; }
    .text-gray-400 { color: #9ca3af !important; }
    .text-white { color: #ffffff !important; }
    .text-black { color: #000000 !important; }
    
    /* Background colors */
    .bg-white { background-color: #ffffff !important; }
    .bg-gray-50 { background-color: #f9fafb !important; }
    .bg-gray-100 { background-color: #f3f4f6 !important; }
    .bg-gray-200 { background-color: #e5e7eb !important; }
    .bg-blue-100 { background-color: #dbeafe !important; }
    .bg-green-100 { background-color: #dcfce7 !important; }
    .bg-orange-100 { background-color: #fed7aa !important; }
    .bg-purple-100 { background-color: #e9d5ff !important; }
    
    /* Report-specific background colors */
    .bg-\\[\\#e8f0fe\\] { background-color: #e8f0fe !important; }
    .bg-\\[\\#e6f9f0\\] { background-color: #e6f9f0 !important; }
    .bg-\\[\\#fff7ed\\] { background-color: #fff7ed !important; }
    .bg-\\[\\#f3e8ff\\] { background-color: #f3e8ff !important; }
    
    .border-gray-200 { border-color: #e5e7eb !important; }
    .border-gray-300 { border-color: #d1d5db !important; }
    
    /* Force any elements with unsupported color functions to use safe fallbacks */
    *[style*="oklch"], *[style*="color("], *[style*="lab("], 
    *[style*="lch("], *[style*="hwb("], *[style*="device-cmyk("] {
      color: inherit !important;
      background-color: inherit !important;
      border-color: inherit !important;
    }
    
    /* Ensure Font Awesome icons render properly */
    .fa, .fas, .far, .fal, .fab, .fa-eye, .fa-arrow-up, .fa-pen, .fa-users {
      color: inherit !important;
    }
  `;
  clonedDoc.head.appendChild(style);
}

/**
 * Helper function to replace unsupported color functions in CSS rules
 */
function replaceUnsupportedColorsInRule(rule: CSSStyleRule): void {
  const unsupportedColorRegex = /(oklch|color|lab|lch|hwb|device-cmyk)\([^)]+\)/gi;
  
  // Check all style properties
  for (let i = 0; i < rule.style.length; i++) {
    const property = rule.style.item(i);
    const value = rule.style.getPropertyValue(property);
    
    if (unsupportedColorRegex.test(value)) {
      // Replace with a safe fallback color
      const fallbackColor = getFallbackColor(property);
      rule.style.setProperty(property, fallbackColor, 'important');
    }
  }
}

/**
 * Helper function to replace unsupported color functions in inline styles
 */
function replaceUnsupportedColorsInStyle(style: CSSStyleDeclaration): void {
  const unsupportedColorRegex = /(oklch|color|lab|lch|hwb|device-cmyk)\([^)]+\)/gi;
  
  for (let i = 0; i < style.length; i++) {
    const property = style.item(i);
    const value = style.getPropertyValue(property);
    
    if (unsupportedColorRegex.test(value)) {
      const fallbackColor = getFallbackColor(property);
      style.setProperty(property, fallbackColor, 'important');
    }
  }
}

/**
 * Get a safe fallback color based on the CSS property
 */
function getFallbackColor(property: string): string {
  if (property.includes('color') && !property.includes('background')) {
    return '#374151'; // gray-700
  } else if (property.includes('background')) {
    return '#ffffff'; // white
  } else if (property.includes('border')) {
    return '#e5e7eb'; // gray-200
  }
  return 'inherit';
}

/**
 * Export multiple pages by element IDs as a multi-page PDF (portrait A4).
 * @param elementIds Array of element IDs
 * @param fileName Name of the PDF file
 */
export async function downloadPdfFromElement(elementIds: string[], fileName: string) {
  const pdf = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });
  for (let i = 0; i < elementIds.length; i++) {
    const input = document.getElementById(elementIds[i]);
    if (!input) continue;
    const canvas = await html2canvas(input, { 
      scale: 2,
      logging: false,
      foreignObjectRendering: false,
      onclone: convertUnsupportedColors
    });
    const imgData = canvas.toDataURL("image/png");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    if (i > 0) pdf.addPage();
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
  }
  pdf.save(fileName);
}

/**
 * Export multiple React pages (by ref or DOM element) as a multi-page PDF (landscape A4).
 * @param elements Array of HTMLElement (e.g. refs.current)
 * @param fileName Name of the PDF file
 */
export async function downloadPdfFromElements(elements: (HTMLElement | null)[], fileName: string) {
  const pdf = new jsPDF({ orientation: "landscape", unit: "pt", format: "a4" });
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();
  
  for (let i = 0; i < elements.length; i++) {
    const input = elements[i];
    if (!input) continue;
    
    const canvas = await html2canvas(input, { 
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      width: input.offsetWidth,
      height: input.offsetHeight,
      logging: false,
      foreignObjectRendering: false,
      onclone: convertUnsupportedColors
    });
    
    const imgData = canvas.toDataURL("image/png");
    
    if (i > 0) pdf.addPage();
    
    // Calculate scaling to maintain aspect ratio and prevent stretching
    const canvasAspectRatio = canvas.width / canvas.height;
    const pdfAspectRatio = pdfWidth / pdfHeight;
    
    let imgWidth, imgHeight, offsetX = 0, offsetY = 0;
    
    if (canvasAspectRatio > pdfAspectRatio) {
      // Canvas is wider than PDF page
      imgWidth = pdfWidth;
      imgHeight = pdfWidth / canvasAspectRatio;
      offsetY = (pdfHeight - imgHeight) / 2;
    } else {
      // Canvas is taller than PDF page
      imgHeight = pdfHeight;
      imgWidth = pdfHeight * canvasAspectRatio;
      offsetX = (pdfWidth - imgWidth) / 2;
    }
    
    // Fill background with white to avoid transparency issues
    pdf.setFillColor(255, 255, 255);
    pdf.rect(0, 0, pdfWidth, pdfHeight, 'F');
    
    pdf.addImage(imgData, "PNG", offsetX, offsetY, imgWidth, imgHeight);
  }
  pdf.save(fileName);
}
