import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Servicio de la capa core encargado de cargar documentos Markdown desde la
 * carpeta de assets de la aplicacion.
 *
 * Define el contrato que la capa de presentacion (features) usa para obtener
 * contenido. La implementacion concreta de la carga la provee `HttpClient`.
 */
@Injectable({ providedIn: 'root' })
export class DocumentationService {
  private readonly basePath = 'assets/diagrams';

  constructor(private readonly http: HttpClient) {}

  /**
   * Carga el contenido de texto de un documento dado su nombre de archivo.
   *
   * @param fileName Nombre del archivo dentro de la carpeta de diagramas.
   */
  loadDocument(fileName: string): Observable<string> {
    return this.http.get(`${this.basePath}/${fileName}`, { responseType: 'text' });
  }

  /** Devuelve la ruta publica de un recurso de documentacion. */
  resolvePath(fileName: string): string {
    return `${this.basePath}/${fileName}`;
  }
}
