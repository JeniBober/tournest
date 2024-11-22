import { usePDF } from 'react-to-pdf';
import { Property } from '@/types';
import { formatCurrency, formatTime, sortPropertiesByTime } from '@/lib/utils';

interface ExportPDFProps {
  properties: Property[];
  tourDate: string;
  agentName?: string;
  clientName?: string;
}

export default function ExportPDF({ properties, tourDate, agentName, clientName }: ExportPDFProps) {
  const { toPDF, targetRef } = usePDF({
    filename: `property-tour-${tourDate}.pdf`,
  });

  const sortedProperties = sortPropertiesByTime(properties);

  if (properties.length === 0) {
    return null;
  }

  return (
    <>
      <div className="mb-4">
        <button
          onClick={() => toPDF()}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
        >
          Export to PDF
        </button>
      </div>

      {/* Hidden with CSS position instead of display:none so it's still rendered */}
      <div style={{ position: 'absolute', left: '-9999px', top: 0, width: '800px' }}>
        <div ref={targetRef} style={{ backgroundColor: 'white', padding: '32px', maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ marginBottom: '24px' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center', marginBottom: '8px', color: '#000000' }}>
              Property Tour Schedule
            </h1>
            <p style={{ textAlign: 'center', marginBottom: '16px', color: '#666666' }}>
              {new Date(tourDate).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
            {(agentName || clientName) && (
              <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', marginBottom: '8px' }}>
                {agentName && <p style={{ color: '#333333' }}><strong>Agent:</strong> {agentName}</p>}
                {clientName && <p style={{ color: '#333333' }}><strong>Client:</strong> {clientName}</p>}
              </div>
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {sortedProperties.map((property) => (
              <div key={property.id} style={{
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: '0 1px 3px rgba(0,0,0,0.12)'
              }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr' }}>
                  <div style={{ height: '200px' }}>
                    {property.imageUrl ? (
                      <img
                        src={property.imageUrl}
                        alt={property.address}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=No+Image';
                        }}
                      />
                    ) : (
                      <div style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#f3f4f6'
                      }}>
                        <span style={{ color: '#9ca3af' }}>No Image</span>
                      </div>
                    )}
                  </div>

                  <div style={{ padding: '16px' }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '8px'
                    }}>
                      <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#000000' }}>
                        {property.address}
                      </h2>
                      <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#2563eb' }}>
                        {formatCurrency(property.price)}
                      </div>
                    </div>

                    <div style={{ marginBottom: '12px' }}>
                      <span style={{
                        display: 'inline-block',
                        padding: '4px 12px',
                        borderRadius: '9999px',
                        fontSize: '14px',
                        fontWeight: '600',
                        marginRight: '8px',
                        backgroundColor: '#dbeafe',
                        color: '#1e40af'
                      }}>
                        {formatTime(property.viewingTime)}
                      </span>
                      <span style={{
                        display: 'inline-block',
                        padding: '4px 12px',
                        borderRadius: '9999px',
                        fontSize: '14px',
                        fontWeight: '600',
                        backgroundColor: '#f3f4f6',
                        color: '#1f2937'
                      }}>
                        {property.bedrooms} bed · {property.bathrooms} bath · {property.squareFootage.toLocaleString()} sqft
                      </span>
                    </div>

                    {property.description && (
                      <div style={{ marginBottom: '8px' }}>
                        <h3 style={{ fontWeight: '600', marginBottom: '4px', color: '#000000' }}>
                          Description
                        </h3>
                        <p style={{ fontSize: '14px', color: '#4b5563' }}>
                          {property.description}
                        </p>
                      </div>
                    )}

                    <div style={{ marginTop: '12px', fontSize: '14px', color: '#374151' }}>
                      <strong>Location:</strong> Lat: {property.location.lat.toFixed(6)}, Lng: {property.location.lng.toFixed(6)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '32px', textAlign: 'center', fontSize: '14px', color: '#6b7280' }}>
            <p>Generated by TourNest</p>
          </div>
        </div>
      </div>
    </>
  );
}
